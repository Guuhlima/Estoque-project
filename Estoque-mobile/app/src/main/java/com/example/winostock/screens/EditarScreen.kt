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
import kotlinx.coroutines.withContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import java.time.LocalDate
import com.example.winostock.data.ApiService
import com.example.winostock.models.Equipamento
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.navigation.NavController
import java.time.format.DateTimeFormatter

@Composable
fun EditarScreen(navController: NavController, id: Int) {
    var equipamento by remember { mutableStateOf("") }
    var quantidade by remember { mutableStateOf("") }
    var data by remember { mutableStateOf("") }
    var mensagem by remember { mutableStateOf("") }

    // carrega os dados iniciais
    LaunchedEffect(id) {
        val lista = ApiService.visualizarEquipamento()
        val item = lista.find { it.id == id }
        item?.let {
            equipamento = it.equipamento
            quantidade = it.quantidade.toString()
            data = it.data // você pode converter para dd/MM/yyyy aqui se quiser mostrar formatado
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Editar Equipamento", modifier = Modifier.align(Alignment.CenterHorizontally))

        TextField(value = equipamento, onValueChange = { equipamento = it }, label = { Text("Equipamento") })
        Spacer(modifier = Modifier.height(8.dp))

        TextField(value = quantidade, onValueChange = { quantidade = it }, label = { Text("Quantidade") })
        Spacer(modifier = Modifier.height(8.dp))

        TextField(value = data, onValueChange = { data = it }, label = { Text("Data (dd/MM/yyyy)") })
        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = {
            CoroutineScope(Dispatchers.IO).launch {
                // formata data para yyyy-MM-dd
                val dataFormatada = try {
                    LocalDate.parse(data, DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                        .format(DateTimeFormatter.ISO_DATE)
                } catch (e: Exception) {
                    ""
                }

                val sucesso = ApiService.editarEquipamento(
                    Equipamento(
                        id = id,
                        equipamento = equipamento,
                        quantidade = quantidade.toIntOrNull() ?: 0,
                        data = dataFormatada
                    )
                )

                withContext(Dispatchers.Main) {
                    mensagem = if (sucesso) "Atualizado com sucesso!" else "Erro na atualização"
                    if (sucesso) navController.navigate("visualizar")
                }
            }
        }) {
            Text("Salvar")
        }

        Spacer(modifier = Modifier.height(16.dp))
        Text(mensagem)
    }
}
