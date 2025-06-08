package com.example.winostock.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.winostock.screens.CadastroScreen
import com.example.winostock.screens.LoginScreen
import com.example.winostock.screens.DashboardScreen

@Composable
fun AppNavigation(navController: NavHostController) {
    NavHost(navController = navController, startDestination = "login") {
        composable("cadastro") { CadastroScreen(navController) }
        composable("login") { LoginScreen(navController) }
        composable("dashboard") { DashboardScreen(navController)}
    }
}

