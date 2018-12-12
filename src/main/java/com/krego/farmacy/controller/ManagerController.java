package com.krego.farmacy.controller;

import com.krego.farmacy.exception.AppException;
import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.helpers.JwtTokenProvider;
import com.krego.farmacy.helpers.LoginEntity;
import com.krego.farmacy.helpers.RoleName;
import com.krego.farmacy.model.Manager;
import com.krego.farmacy.model.Role;
import com.krego.farmacy.repositories.ManagerRepository;

import com.krego.farmacy.repositories.RoleRepository;
import com.krego.farmacy.responses.ApiResponse;
import com.krego.farmacy.responses.JwtAuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    ManagerRepository managerRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    //GET mappings
    @GetMapping("/get")
    @ResponseBody
    public ResponseEntity<?> getManagerById(@RequestParam("managerCode") Long managerId) {
        Optional<Manager> manager = managerRepository.findById(managerId);
        return manager.map(response -> ResponseEntity.ok().body(response))
                .orElseThrow(() -> new ResourceNotFoundException("Manager", "id", managerId));
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    //POST mappings
    @PostMapping("/new")
    @ResponseBody
    public Manager createManager(@Valid @RequestBody Manager manager) {
        String hashedPassword = passwordEncoder.encode(manager.getPassword());
        manager.setPassword(hashedPassword);
        return managerRepository.save(manager);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Manager manager) {
        if(managerRepository.existsById(manager.getManagerCode())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Manager newManager = new Manager(manager.getManagerCode(), manager.getName(), manager.getPassword(),
                manager.getSurname(), manager.getPatronymic(), manager.getAddress(), manager.getPhoneNumber(),
                manager.getCorporatePhoneNumber(), manager.getPosition());

        manager.setPassword(passwordEncoder.encode(manager.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        newManager.setRoles(Collections.singleton(userRole));

        Manager result = managerRepository.save(manager);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(Long.toString(result.getManagerCode())).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity<?> loginManager(@Valid @RequestBody LoginEntity loginEntity){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginEntity.getLogin().toString(),
                        loginEntity.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        Optional<Manager> manager = managerRepository.findById(loginEntity.getLogin());

        if(passwordEncoder.matches(loginEntity.getPassword(), manager.get().getPassword())) {
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        } else {
            return new ResponseEntity<>("Unauthorised", HttpStatus.UNAUTHORIZED);
        }

    }

    //PUT mappings
    @PutMapping("/update")
    @ResponseBody
    public Manager updateManagerById(@RequestParam("managerCode") Long managerId,
                                        @Valid @RequestBody Manager managerDetails) {
        Manager manager = managerRepository.findById(managerId)
                .orElseThrow(() -> new ResourceNotFoundException("Manager", "id", managerId));

        manager.setAddress(managerDetails.getAddress());
        manager.setCorporatePhoneNumber(managerDetails.getCorporatePhoneNumber());

        //may cause problems
        manager.setDrugstores(managerDetails.getDrugstores());

        manager.setName(managerDetails.getName());
        manager.setPatronymic(managerDetails.getPatronymic());
        manager.setSurname(managerDetails.getSurname());
        manager.setPosition(managerDetails.getPosition());
        manager.setPhoneNumber(managerDetails.getPhoneNumber());

        return managerRepository.save(manager);

    }

    @DeleteMapping("/delete")
    @ResponseBody
    public ResponseEntity<?> deleteManager(@RequestParam("managerCode") Long managerId) {

        Manager manager = managerRepository.findById(managerId)
                            .orElseThrow(() -> new ResourceNotFoundException("Manager", "id", managerId));

        managerRepository.delete(manager);

        return ResponseEntity.ok().build();

    }
}
