package com.krego.farmacy.repositories;

import com.krego.farmacy.model.SoldInPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoldInPeriodRepository extends JpaRepository<SoldInPeriod, Long> {
}
