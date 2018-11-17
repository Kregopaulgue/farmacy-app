package com.krego.farmacy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sold_in_period")
public class SoldInPeriod {

    @Id
    private long id;

    @NonNull
    private long drugStoreCode;
    private Date periodStart;
    private Date periodEnd;
    private double sum;
    private int amount;

}
