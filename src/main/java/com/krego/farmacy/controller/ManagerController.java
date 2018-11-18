package com.krego.farmacy.controller;

import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.model.Manager;
import com.krego.farmacy.repositories.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    ManagerRepository managerRepository;


    //GET mappings
    @GetMapping("/get/{id}")
    public Manager getManagerById(@PathVariable(value = "id") Long managerId) {
        return managerRepository.findById(managerId)
                .orElseThrow(() -> new ResourceNotFoundException("Manager", "id", managerId));
    }

    @GetMapping("/all")
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    //POST mappings
    @PostMapping("/new")
    public Manager createManager(@Valid @RequestBody Manager manager) {
        return managerRepository.save(manager);
    }

    //PUT mappings
    @PutMapping("/update/{id}")
    public Manager updateManagerById(@PathVariable(value = "id") Long managerId,
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteManager(@PathVariable(value = "id") Long managerId) {

        Manager manager = managerRepository.findById(managerId)
                            .orElseThrow(() -> new ResourceNotFoundException("Manager", "id", managerId));

        managerRepository.delete(manager);

        return ResponseEntity.ok().build();

    }
}
