package com.krego.farmacy.controller;

import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.model.Drugstore;
import com.krego.farmacy.model.Medicine;
import com.krego.farmacy.repositories.DrugstoreRepository;
import com.krego.farmacy.repositories.ManagerRepository;
import com.krego.farmacy.repositories.ManufacturerRepository;
import com.krego.farmacy.repositories.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/medicine")
public class MedicineController {
    
    @Autowired
    MedicineRepository medicineRepository;

    @Autowired
    ManufacturerRepository manufacturerRepository;

    @Autowired
    DrugstoreRepository drugstoreRepository;

    //GET mappings
    @GetMapping("/get")
    @ResponseBody
    public Medicine getMedicineById(@RequestParam("medicineCode") Long medicineId) {
        return medicineRepository.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "id", medicineId));
    }

    @GetMapping("/manager")
    @ResponseBody
    public Page<Medicine> getMedicineByManagerCode(@RequestParam("managerCode") Long managerCode, Pageable pageable) {
        return medicineRepository.findByManagerCode(managerCode, pageable);
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    //POST mappings
    @PostMapping("/new")
    @ResponseBody
    public Medicine createMedicine(@RequestParam("manufacturerCode") Long manufacturerCode,
                                   @Valid @RequestBody Medicine medicine) {
        return manufacturerRepository.findById(manufacturerCode).map(manufacturer -> {
            medicine.setManufacturer(manufacturer);
            return medicineRepository.save(medicine);
        }).orElseThrow(() -> new ResourceNotFoundException("Manufacturer", "manufacturerCode", manufacturerCode));
    }

    //PUT mappings
    @PutMapping("/update")
    @ResponseBody
    public Medicine updateMedicineById(@RequestParam("medicineCode") Long medicineId,
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

    @DeleteMapping("/delete")
    @ResponseBody
    public ResponseEntity<?> deleteMedicine(@RequestParam("medicineCode") Long medicineId) {

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "id", medicineId));

        medicineRepository.delete(medicine);

        return ResponseEntity.ok().build();

    }
    
}
