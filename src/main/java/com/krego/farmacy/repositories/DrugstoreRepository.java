package com.krego.farmacy.repositories;

import com.krego.farmacy.model.Drugstore;
import com.krego.farmacy.model.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrugstoreRepository extends JpaRepository<Drugstore, Long> {

    Page<Drugstore> findByManagerManagerCode(Long managerCode, Pageable pageable);
    List<Drugstore> findAllByManagerManagerCode(Long managerCode);

    Drugstore findByDrugstoreCode(Long drugstoreCode);

}
