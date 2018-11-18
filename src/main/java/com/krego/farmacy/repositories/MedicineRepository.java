package com.krego.farmacy.repositories;

import com.krego.farmacy.model.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    Page<Medicine> findByManufacturerCode(Long manufacturerCode, Pageable pageable);

}
