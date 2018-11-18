package com.krego.farmacy.controller;

import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.model.SoldInPeriod;
import com.krego.farmacy.repositories.SoldInPeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/sold")
public class SoldInPeriodController {
    
    @Autowired
    SoldInPeriodRepository soldInPeriodRepository;

    //GET mappings
    @GetMapping("/get/{id}")
    public SoldInPeriod getSoldInPeriodById(@PathVariable(value = "id") Long soldInPeriodId) {
        return soldInPeriodRepository.findById(soldInPeriodId)
                .orElseThrow(() -> new ResourceNotFoundException("SoldInPeriod", "id", soldInPeriodId));
    }

    @GetMapping("/all")
    public List<SoldInPeriod> getAllSoldInPeriods() {
        return soldInPeriodRepository.findAll();
    }

    //POST mappings
    @PostMapping("/new")
    public SoldInPeriod createSoldInPeriod(@Valid @RequestBody SoldInPeriod soldInPeriod) {
        return soldInPeriodRepository.save(soldInPeriod);
    }

    //PUT mappings
    @PutMapping("/update/{id}")
    public SoldInPeriod updateSoldInPeriodById(@PathVariable(value = "id") Long soldInPeriodId,
                                       @Valid @RequestBody SoldInPeriod soldInPeriodDetails) {
        SoldInPeriod soldInPeriod = soldInPeriodRepository.findById(soldInPeriodId)
                .orElseThrow(() -> new ResourceNotFoundException("SoldInPeriod", "id", soldInPeriodId));

        soldInPeriod.setAmount(soldInPeriodDetails.getAmount());
        soldInPeriod.setPeriodStart(soldInPeriodDetails.getPeriodStart());
        soldInPeriod.setPeriodEnd(soldInPeriodDetails.getPeriodEnd());
        soldInPeriod.setSum(soldInPeriodDetails.getSum());

        //may cause problems
        soldInPeriod.setDrugstore(soldInPeriodDetails.getDrugstore());
        soldInPeriod.setMedicine(soldInPeriodDetails.getMedicine());

        return soldInPeriodRepository.save(soldInPeriod);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSoldInPeriod(@PathVariable(value = "id") Long soldInPeriodId) {

        SoldInPeriod soldInPeriod = soldInPeriodRepository.findById(soldInPeriodId)
                .orElseThrow(() -> new ResourceNotFoundException("SoldInPeriod", "id", soldInPeriodId));

        soldInPeriodRepository.delete(soldInPeriod);

        return ResponseEntity.ok().build();

    }
    
}
