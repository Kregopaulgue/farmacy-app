package com.krego.farmacy.helpers;

public class LoginEntity {

    private Long login;
    private String password;

    public LoginEntity() {
    }

    public LoginEntity(Long login, String password) {
        this.login = login;
        this.password = password;
    }

    public Long getLogin() {
        return login;
    }

    public void setLogin(Long login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
