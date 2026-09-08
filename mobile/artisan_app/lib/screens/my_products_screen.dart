import 'package:flutter/material.dart';

class MyProductsScreen extends StatelessWidget {
  const MyProductsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Products')),
      body: const Center(
        child: Text(
          'Your published products will appear here.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 16, color: Colors.grey),
        ),
      ),
    );
  }
}