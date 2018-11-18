package com.krego.farmacy.model;

import jdk.internal.jline.internal.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medicine")
public class Medicine {

    @Id
    @Column(name = "medicine_code")
    private long medicineCode;

    @Nullable
    private long soldCode;

    @NonNull
    private long manufacturerCode;
    private String title;
    private String expirationTerm;
    private double price;
    private String measurementUnit;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "manufacturer_code", nullable = false)
    private Manufacturer manufacturer;

    @OneToMany(mappedBy = "medicine")
    private Set<SoldInPeriod> soldInPeriods;

}
