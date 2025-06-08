package com.example.winostock.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.TextField
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.winostock.data.ApiService
import com.example.winostock.models.Equipamento
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.navigation.NavController

@Composable
fun VisualizarScreen(navController: NavController) {
    var equipamentos by remember { mutableStateOf<List<Equipamento>>(emptyList()) }
    var mensagem by remember { mutableStateOf("") }

    fun carregarEquipamentos() {
        CoroutineScope(Dispatchers.IO).launch {
            val resultado = ApiService.visualizarEquipamento()
            equipamentos = resultado
            if (resultado.isNotEmpty()) {
                mensagem = "Nenhum equipamento encontrado ou erro ao carregar"
            }
        }
    }

    LaunchedEffect(Unit) {
        carregarEquipamentos()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Button(
            onClick = { navController.navigate("dashboard") },
            modifier = Modifier.align(Alignment.Start)
        ) {
            Text("Voltar")
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (equipamentos.isNotEmpty()) {
            LazyColumn {
                items(equipamentos) { equipamento ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        elevation = CardDefaults.cardElevation(4.dp)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text("Equipamento: ${equipamento.equipamento}")
                            Text("Quantidade: ${equipamento.quantidade}")
                            Text("Data: ${equipamento.data}")

                            Spacer(modifier = Modifier.height(8.dp))

                            Button(onClick = {
                                CoroutineScope(Dispatchers.IO).launch {
                                    equipamento.id?.let { id ->
                                        val sucesso = ApiService.deletarEquipamento(id)
                                        if (sucesso) {
                                            equipamentos = equipamentos.filterNot { it.id == id }
                                        }
                                    }
                                }
                            }) {
                                Text("Deletar")
                            }

                            Button(onClick = {
                                equipamento.id?.let {id ->
                                    navController.navigate("editar/$id")
                                }
                            }) {
                                Text("Editar")
                            }
                        }
                    }
                }
            }
        } else {
            Text(mensagem, modifier = Modifier.align(Alignment.CenterHorizontally))
        }
    }
}
