package com.example.winostock.models

import kotlinx.serialization.Serializable

@Serializable
data class Usuarios(
    val email: String,
    val senha: String
)