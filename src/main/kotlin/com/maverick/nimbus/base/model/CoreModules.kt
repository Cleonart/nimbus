package com.maverick.nimbus

import jakarta.persistence.*

@Entity
@Table(name = "core_modules")
data class CoreModules(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, length = 255)
    val name: String = ""
)
