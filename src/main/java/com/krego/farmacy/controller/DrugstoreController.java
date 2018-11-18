package com.krego.farmacy.controller;

import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.model.Drugstore;
import com.krego.farmacy.repositories.DrugstoreRepository;
import com.krego.farmacy.repositories.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/drugstore")
public class DrugstoreController {

    @Autowired
    DrugstoreRepository drugstoreRepository;

    @Autowired
    ManagerRepository managerRepository;

    //GET mappings
    @GetMapping("/get/{id}")
    public Drugstore getDrugstoreById(@PathVariable(value = "id") Long drugstoreId) {
        return drugstoreRepository.findById(drugstoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Drugstore", "id", drugstoreId));
    }

    @GetMapping("/all")
    public List<Drugstore> getAllDrugstores() {
        return drugstoreRepository.findAll();
    }

    //POST mappings
    @PostMapping("/new")
    public Drugstore createDrugstore(@RequestParam("managerCode") Long managerCode, @Valid @RequestBody Drugstore drugstore) {

        return managerRepository.findById(managerCode).map(manager -> {
            drugstore.setManager(manager);
            return drugstoreRepository.save(drugstore);
        }).orElseThrow(() -> new ResourceNotFoundException("ManagerId", "manager_code", managerCode));

    }

    //PUT mappings
    @PutMapping("/update/{id}")
    public Drugstore updateDrugstoreById(@PathVariable(value = "id") Long drugstoreId,
                                     @Valid @RequestBody Drugstore drugstoreDetails) {
        Drugstore Drugstore = drugstoreRepository.findById(drugstoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Drugstore", "id", drugstoreId));

        Drugstore.setAddress(drugstoreDetails.getAddress());

        Drugstore.setNetworkTitle(drugstoreDetails.getNetworkTitle());
        Drugstore.setPhoneNumber(drugstoreDetails.getPhoneNumber());
        Drugstore.setRegion(drugstoreDetails.getRegion());

        //may cause problems
        Drugstore.setManager(drugstoreDetails.getManager());
        Drugstore.setSoldInPeriods(drugstoreDetails.getSoldInPeriods());

        return drugstoreRepository.save(Drugstore);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDrugstore(@PathVariable(value = "id") Long drugstoreId) {

        Drugstore Drugstore = drugstoreRepository.findById(drugstoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Drugstore", "id", drugstoreId));

        drugstoreRepository.delete(Drugstore);

        return ResponseEntity.ok().build();

    }

}
