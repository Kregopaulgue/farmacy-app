package com.krego.farmacy.repositories;

import com.krego.farmacy.model.Drugstore;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugstoreRepository extends JpaRepository<Drugstore, Long> {

    Page<Drugstore> findByManagerManagerCode(Long managerCode, Pageable pageable);

}
