package com.example.winostock.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.winostock.screens.CadastroScreen
import com.example.winostock.screens.LoginScreen
import com.example.winostock.screens.DashboardScreen
import com.example.winostock.screens.EditarScreen
import com.example.winostock.screens.VisualizarScreen

@Composable
fun AppNavigation(navController: NavHostController) {
    NavHost(navController = navController, startDestination = "login") {
        composable("cadastro") { CadastroScreen(navController) }
        composable("login") { LoginScreen(navController) }
        composable("dashboard") { DashboardScreen(navController)}
        composable("visualizar") { VisualizarScreen(navController)}
        composable("editar/{id}") { backStackEntry ->
            val id = backStackEntry.arguments?.getString("id")?.toIntOrNull()
            id?.let {
                EditarScreen(navController, it)
            }
        }
    }
}

