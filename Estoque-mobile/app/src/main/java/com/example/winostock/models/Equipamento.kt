package com.example.winostock.models

import kotlinx.serialization.Serializable

@Serializable
data class Equipamento(
    val equipamento: String,
    val quantidade: String,
    val data: String
)
