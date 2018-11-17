package com.krego.farmacy.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "drug_store")
public class DrugStore {

    @Id
    private long code;

    @NonNull
    private long managerCode;
    private String address;
    private String networkTitle;
    private String phoneNumber;
    private String region;

}
