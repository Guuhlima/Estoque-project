package com.example.winostock.models

import kotlinx.serialization.Serializable

@Serializable
data class Equipamento(
    val id: Int? = null,
    val equipamento: String,
    val quantidade: Int,
    val data: String
)

