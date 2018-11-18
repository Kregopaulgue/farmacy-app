package com.krego.farmacy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "manufacturer")
public class Manufacturer {

    @Id
    private long code;

    @NonNull
    private String address;
    private String phoneNumber;
    private String firmTitle;

    @OneToMany(mappedBy = "manufacturer", orphanRemoval = true)
    private Set<Medicine> medicines;

}
