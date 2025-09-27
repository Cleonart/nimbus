package com.maverick.nimbus

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.*

@Entity
@Table(name = "core_company")
@Schema(description = "Company Entity")
class CoreCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @Column(nullable = false, length = 255)
    var code: String = ""

    @Column(nullable = false, length = 255)
    var name: String = ""

    // no-arg constructor (required by JPA)
    constructor()

    // constructor with parameters
    constructor(code: String, name: String) {
        this.code = code
        this.name = name
    }
}