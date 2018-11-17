package com.krego.farmacy.model;

import jdk.internal.jline.internal.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue
    private long code;

    @Nullable
    private long soldCode;

    @NonNull
    private long manufacturerCode;
    private String title;
    private String expirationTerm;
    private double price;
    private String measurementUnit;

}
