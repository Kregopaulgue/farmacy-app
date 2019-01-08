package com.krego.farmacy.controller;

import com.krego.farmacy.exception.ResourceNotFoundException;
import com.krego.farmacy.model.Drugstore;
import com.krego.farmacy.model.Medicine;
import com.krego.farmacy.model.SoldInPeriod;
import com.krego.farmacy.repositories.DrugstoreRepository;
import com.krego.farmacy.repositories.MedicineRepository;
import com.krego.farmacy.repositories.SoldInPeriodRepository;
import com.krego.farmacy.upload.FileStorageService;
import com.krego.farmacy.upload.UploadFileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/sold")
public class SoldInPeriodController {
    
    @Autowired
    SoldInPeriodRepository soldInPeriodRepository;

    @Autowired
    DrugstoreRepository drugstoreRepository;

    @Autowired
    MedicineRepository medicineRepository;

    @Autowired
    private FileStorageService fileStorageService;

    //GET mappings
    @GetMapping("/get")
    @ResponseBody
    public SoldInPeriod getSoldInPeriodById(@RequestParam("soldInPeriodCode") Long soldInPeriodId) {
        return soldInPeriodRepository.findById(soldInPeriodId)
                .orElseThrow(() -> new ResourceNotFoundException("SoldInPeriod", "id", soldInPeriodId));
    }

    @GetMapping("/manager")
    @ResponseBody
    public Page<SoldInPeriod> getAllSoldInPeriods(@RequestParam("managerCode") Long managerCode, Pageable pageable) {

        return soldInPeriodRepository.findByDrugstore_ManagerManagerCode(managerCode, pageable);

    }

    @GetMapping("/all")
    @ResponseBody
    public List<SoldInPeriod> getAllSoldInPeriods() {
        return soldInPeriodRepository.findAll();
    }

    //POST mappings
    @PostMapping("/upload")
    public UploadFileResponse uploadSoldInPeriod(@RequestParam("file") MultipartFile file) {

        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/new")
    @ResponseBody
    public SoldInPeriod createSoldInPeriod(@RequestParam("drugstoreCode") Long drugstoreCode,
                                           @RequestParam("medicineCode") Long medicineCode,
                                           @Valid @RequestBody SoldInPeriod soldInPeriod) {
        Drugstore parentDrugstore = drugstoreRepository.findById(drugstoreCode)
                .orElseThrow(() -> new ResourceNotFoundException("Drugstore", "drugstoreCode", drugstoreCode));
        Medicine parentMedicine = medicineRepository.findById(medicineCode)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "medicineCode", medicineCode));
        soldInPeriod.setDrugstore(parentDrugstore);
        soldInPeriod.setMedicine(parentMedicine);

        System.out.println(soldInPeriod.getSoldId());

        return soldInPeriodRepository.save(soldInPeriod);
    }

    //PUT mappings
    @PutMapping("/update")
    @ResponseBody
    public SoldInPeriod updateSoldInPeriodById(@RequestParam("soldInPeriodCode") Long soldInPeriodId,
                                       @Valid @RequestBody SoldInPeriod soldInPeriodDetails) {
        SoldInPeriod soldInPeriod = soldInPeriodRepository.findById(soldInPeriodId)
                .orElseThrow(() -> new ResourceNotFoundException("SoldInPeriod", "id", soldInPeriodId));

        soldInPeriod.setAmount(soldInPeriodDetails.getAmount());
        soldInPeriod.setPeriodStart(soldInPeriodDetails.getPeriodStart());
        soldInPeriod.setPeriodEnd(soldInPeriodDetails.getPeriodEnd());
        soldInPeriod.setSum(soldInPeriodDetails.getSum());

        return soldInPeriodRepository.save(soldInPeriod);

    }

    @DeleteMapping("/delete")
    @ResponseBody
    public ResponseEntity<?> deleteSoldInPeriod(@RequestParam("soldInPeriodCode") Long soldInPeriodId) {

        SoldInPeriod soldInPeriod = soldInPeriodRepository.findById(soldInPeriodId)
                .orElseThrow(() -> new ResourceNotFoundException("SoldInPeriod", "id", soldInPeriodId));

        soldInPeriodRepository.delete(soldInPeriod);

        return ResponseEntity.ok().build();

    }
    
}
