package com.krego.farmacy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugstoreRepository extends JpaRepository<DrugstoreRepository, Long> {
}
