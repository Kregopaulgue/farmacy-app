package com.krego.farmacy.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "manager")
public class Manager {

    @Id
    private long code;

    @NonNull
    private String name;
    private String surname;
    private String patronymic;
    private String address;
    private String phoneNumber;
    private String corporatePhoneNumber;
    private String position;

}
