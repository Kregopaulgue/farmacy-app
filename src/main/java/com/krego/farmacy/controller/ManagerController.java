package com.krego.farmacy.controller;

import com.krego.farmacy.encoder.PasswordEncoderConfig;
import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.helpers.LoginEntity;
import com.krego.farmacy.model.Manager;
import com.krego.farmacy.repositories.ManagerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    ManagerRepository managerRepository;

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
        PasswordEncoderConfig passwordEncoderConfig = new PasswordEncoderConfig();
        String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(manager.getPassword());
        manager.setPassword(hashedPassword);
        return managerRepository.save(manager);
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> loginManager(@Valid @RequestBody LoginEntity loginEntity){

        Optional<Manager> manager = managerRepository.findById(loginEntity.getLogin());
        PasswordEncoderConfig passwordEncoderConfig = new PasswordEncoderConfig();

        if(manager.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if(passwordEncoderConfig.passwordEncoder().matches(loginEntity.getPassword(), manager.get().getPassword())) {
            return manager.map(response -> ResponseEntity.ok().body(response))
                    .orElseThrow(() -> new ResourceNotFoundException("Manager", "id", loginEntity.getLogin()));
        } else {
            return
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
