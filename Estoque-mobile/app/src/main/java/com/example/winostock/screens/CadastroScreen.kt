package com.example.winostock.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
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

@Composable
fun CadastroScreen(navController: NavHostController) {
    var equipamento by remember { mutableStateOf("") }
    var quantidade by remember { mutableStateOf("") }
    var data by remember { mutableStateOf("") }
    var mensagem by remember { mutableStateOf("") }

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

        Box(
            modifier = Modifier
                .fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                TextField(
                    value = equipamento,
                    onValueChange = { equipamento = it },
                    label = { Text("Equipamento") }
                )
                Spacer(modifier = Modifier.height(8.dp))

                TextField(
                    value = quantidade,
                    onValueChange = { quantidade = it },
                    label = { Text("Quantidade") }
                )
                Spacer(modifier = Modifier.height(8.dp))

                TextField(
                    value = data,
                    onValueChange = { data = it },
                    label = { Text("Data") }
                )
                Spacer(modifier = Modifier.height(16.dp))

                Button(onClick = {
                    println("Enviando: equipamento=$equipamento, quantidade=$quantidade, data=$data")
                    CoroutineScope(Dispatchers.IO).launch {
                        val sucesso = ApiService.cadastrarEquipamento(
                            Equipamento(
                                equipamento = equipamento,
                                quantidade = quantidade.toIntOrNull() ?: 0,
                                data = data
                            )
                        )
                        println("Resultado da API: $sucesso")
                        mensagem = if (sucesso) "Cadastro realizado!" else "Erro no cadastro"
                    }
                }) {
                    Text("Cadastrar")
                }

                Spacer(modifier = Modifier.height(16.dp))
                Text(mensagem)
            }
        }
    }
}
