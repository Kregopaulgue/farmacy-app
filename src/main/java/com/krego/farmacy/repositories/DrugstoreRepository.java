package com.krego.farmacy.repositories;

import com.krego.farmacy.model.Drugstore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugstoreRepository extends JpaRepository<Drugstore, Long> {
}
