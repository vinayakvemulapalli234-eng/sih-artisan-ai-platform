import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'screens/splash_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/home_screen.dart';
import 'screens/add_product_screen.dart';
import 'screens/description_screen.dart';
import 'screens/pricing_screen.dart';
import 'screens/product_detail_screen.dart';
import 'screens/my_products_screen.dart';
import 'screens/profile_screen.dart';

final GoRouter _router = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(path: '/splash', builder: (context, state) => const SplashScreen()),
    GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
    GoRoute(path: '/register', builder: (context, state) => const RegisterScreen()),
    GoRoute(path: '/home', builder: (context, state) => const HomeScreen()),
    GoRoute(path: '/add-product', builder: (context, state) => const AddProductScreen()),
    GoRoute(path: '/description', builder: (context, state) => const DescriptionScreen()),
    GoRoute(path: '/pricing', builder: (context, state) => const PricingScreen()),
    GoRoute(path: '/product-detail', builder: (context, state) => const ProductDetailScreen()),
    GoRoute(path: '/my-products', builder: (context, state) => const MyProductsScreen()),
    GoRoute(path: '/profile', builder: (context, state) => const ProfileScreen()),
  ],
);

void main() {
  runApp(const ArtisanApp());
}

class ArtisanApp extends StatelessWidget {
  const ArtisanApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Artisan App',
      theme: ThemeData(
        colorSchemeSeed: const Color(0xFFD35400),
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFFDF6F0),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          foregroundColor: Colors.black87,
        ),
      ),
      routerConfig: _router,
    );
  }
}