import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ProductDetailScreen extends StatelessWidget {
  const ProductDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Product Preview')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.check_circle, size: 64, color: Colors.green),
            const SizedBox(height: 16),
            const Text('Listing ready!', style: TextStyle(fontSize: 20)),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => context.go('/home'),
              child: const Text('Back to My Products'),
            ),
          ],
        ),
      ),
    );
  }
}