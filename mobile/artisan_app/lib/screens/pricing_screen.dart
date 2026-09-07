import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/product_draft.dart';

class PricingScreen extends StatelessWidget {
  const PricingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Suggested Price')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (currentDraft.photoBytes != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.memory(currentDraft.photoBytes!, height: 150, fit: BoxFit.cover, width: double.infinity),
              ),
            if (currentDraft.photoBytes != null) const SizedBox(height: 16),
            const Text('Suggested Range', style: TextStyle(fontSize: 16, color: Colors.grey)),
            const Text('₹1,600 – ₹1,900',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            const Text('Why this range?', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            _buildFactorRow('Material cost', '₹500'),
            _buildFactorRow('Labor / craft effort', '₹700'),
            _buildFactorRow('Market comparison (4 similar items)', '₹1,700'),
            _buildFactorRow('Demand level', 'Medium'),
            const Spacer(),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      currentDraft.priceRange = '₹1,600 – ₹1,900';
                      context.go('/product-detail');
                    },
                    child: const Text('Accept'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {},
                    child: const Text('Adjust'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFactorRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 15)),
          Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}