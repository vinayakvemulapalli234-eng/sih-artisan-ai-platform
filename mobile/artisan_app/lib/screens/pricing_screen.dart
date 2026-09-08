import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/pricing_api.dart';

class PricingScreen extends StatefulWidget {
  const PricingScreen({super.key});

  @override
  State<PricingScreen> createState() => _PricingScreenState();
}

class _PricingScreenState extends State<PricingScreen> {
  bool _isLoading = true;
  String? _errorMessage;
  Map<String, dynamic>? _result;

  @override
  void initState() {
    super.initState();
    _fetchPrice();
  }

  Future<void> _fetchPrice() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // TODO: replace this sample data with real product data
      // from Catalog AI / your product form once that's connected.
      final result = await PricingApi.getPriceRecommendation(
        category: "handicraft",
        materialCost: 500,
        labourHours: 8,
        labourRate: 50,
        complexity: 3,
        quality: 4,
        demand: 3,
        uniqueness: 3,
      );

      setState(() {
        _result = result;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString().replaceFirst("Exception: ", "");
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Suggested Price')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: _buildBody(),
      ),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_errorMessage != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_errorMessage!, textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.red, fontSize: 16)),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: _fetchPrice, child: const Text('Retry')),
          ],
        ),
      );
    }

    final range = _result!["price_range"];
    final explanation = _result!["explanation"];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Suggested Range', style: TextStyle(fontSize: 16, color: Colors.grey)),
        Text(
          '₹${range["min"]} – ₹${range["max"]}',
          style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text('Recommended: ₹${range["recommended"]}',
            style: const TextStyle(fontSize: 16, color: Colors.green)),
        const SizedBox(height: 24),
        const Text('Why this range?', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        _buildFactorRow('Material cost', '₹${explanation["material_cost"]}'),
        _buildFactorRow('Labour cost', '₹${explanation["labour_cost"]}'),
        _buildFactorRow('Complexity adjustment', '${explanation["complexity_adjustment"]}'),
        _buildFactorRow('Quality adjustment', '${explanation["quality_adjustment"]}'),
        _buildFactorRow('Demand adjustment', '${explanation["demand_adjustment"]}'),
        const Spacer(),
        Row(
          children: [
            Expanded(
              child: ElevatedButton(
                onPressed: () => context.go('/product-detail'),
                child: const Text('Accept'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: OutlinedButton(
                onPressed: _fetchPrice,
                child: const Text('Adjust'),
              ),
            ),
          ],
        ),
      ],
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