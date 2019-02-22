package com.krego.farmacy.payloads;

public class ManagerCodeAvailability {
    private Boolean available;

    public ManagerCodeAvailability(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
