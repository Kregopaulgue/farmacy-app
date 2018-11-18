package com.krego.farmacy.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "manager")
public class Manager {

    @Id
    @Column(name = "manager_code")
    private long managerCode;

    @NonNull
    private String name;
    private String surname;
    private String patronymic;
    private String address;
    private String phoneNumber;
    private String corporatePhoneNumber;
    private String position;

    @OneToMany(mappedBy = "manager")
    private Set<Drugstore> drugstores;

}
