package com.krego.farmacy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sold_in_period")
public class SoldInPeriod {

    @Id
    @GeneratedValue
    @Column(name = "sold_id")
    private long soldId;

    @NonNull
    private Date periodStart;
    private Date periodEnd;
    private double sum;
    private int amount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "drugstore_code", nullable = false)
    private Drugstore drugstore;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "medicine_code", nullable = false)
    private Medicine medicine;

}
