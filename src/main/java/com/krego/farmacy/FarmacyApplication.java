package com.krego.farmacy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FarmacyApplication {

    public static void main(String[] args) {
        SpringApplication.run(FarmacyApplication.class, args);
    }
}
