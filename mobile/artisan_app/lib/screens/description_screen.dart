import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/product_draft.dart';

class DescriptionScreen extends StatefulWidget {
  const DescriptionScreen({super.key});

  @override
  State<DescriptionScreen> createState() => _DescriptionScreenState();
}

class _DescriptionScreenState extends State<DescriptionScreen> {
  final _descController = TextEditingController(
    text: 'Handcrafted terracotta pot, made using traditional techniques.',
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Product Description')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (currentDraft.photoBytes != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.memory(currentDraft.photoBytes!, height: 140, fit: BoxFit.cover, width: double.infinity),
              ),
            const SizedBox(height: 16),
            const Text('AI-generated description (edit if needed)',
                style: TextStyle(fontSize: 14, color: Colors.grey)),
            const SizedBox(height: 8),
            TextField(
              controller: _descController,
              maxLines: 5,
              decoration: const InputDecoration(border: OutlineInputBorder()),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  currentDraft.description = _descController.text;
                  context.go('/pricing');
                },
                child: const Text('Continue to Pricing', style: TextStyle(fontSize: 18)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}