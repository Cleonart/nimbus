package com.maverick.nimbus

import jakarta.persistence.*

@Entity
@Table(name = "core_company")
data class CoreCompany(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, length = 255)
    val name: String = ""
)
