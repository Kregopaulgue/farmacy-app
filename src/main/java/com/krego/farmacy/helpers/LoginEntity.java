package com.krego.farmacy.helpers;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class LoginEntity {

    private Long login;
    private String password;

}
