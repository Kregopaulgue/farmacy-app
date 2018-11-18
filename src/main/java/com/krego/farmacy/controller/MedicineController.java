package com.krego.farmacy.controller;

import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.model.Medicine;
import com.krego.farmacy.repositories.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/medicine")
public class MedicineController {
    
    @Autowired
    MedicineRepository medicineRepository;

    //GET mappings
    @GetMapping("/get/{id}")
    public Medicine getMedicineById(@PathVariable(value = "id") Long medicineId) {
        return medicineRepository.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "id", medicineId));
    }

    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    //POST mappings
    @PostMapping("/new")
    public Medicine createMedicine(@Valid @RequestBody Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    //PUT mappings
    @PutMapping("/update/{id}")
    public Medicine updateMedicineById(@PathVariable(value = "id") Long medicineId,
                                               @Valid @RequestBody Medicine medicineDetails) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "id", medicineId));

        medicine.setTitle(medicineDetails.getTitle());
        medicine.setExpirationTerm(medicineDetails.getExpirationTerm());
        medicine.setMeasurementUnit(medicineDetails.getMeasurementUnit());
        medicine.setPrice(medicineDetails.getPrice());

        //may cause problems
        medicine.setManufacturer(medicineDetails.getManufacturer());
        medicine.setSoldInPeriods(medicineDetails.getSoldInPeriods());

        return medicineRepository.save(medicine);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable(value = "id") Long medicineId) {

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "id", medicineId));

        medicineRepository.delete(medicine);

        return ResponseEntity.ok().build();

    }
    
}
