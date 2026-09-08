import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Products'),
      ),
      body: const Center(
        child: Text(
          'No products yet.\nTap + to add your first product.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 16, color: Colors.grey),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.go('/add-product'),
        child: const Icon(Icons.add),
      ),
    );
  }
}