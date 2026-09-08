import 'dart:convert';
import 'package:http/http.dart' as http;

class PricingApi {
  // Android Emulator -> 10.0.2.2 | Physical phone (same WiFi) -> your PC's IP | iOS Simulator -> 127.0.0.1
  static const String baseUrl = "http://127.0.0.1:5000";
  static Future<Map<String, dynamic>> getPriceRecommendation({
    required String category,
    required double materialCost,
    required double labourHours,
    double labourRate = 50,
    int complexity = 3,
    int quality = 3,
    int demand = 3,
    int uniqueness = 3,
  }) async {
    final url = Uri.parse("$baseUrl/predict-price");

    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "category": category,
        "material_cost": materialCost,
        "labour_hours": labourHours,
        "labour_rate": labourRate,
        "complexity": complexity,
        "quality": quality,
        "demand": demand,
        "uniqueness": uniqueness,
      }),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200) {
      return data as Map<String, dynamic>;
    } else {
      throw Exception(data["error"] ?? "Failed to get price (${response.statusCode})");
    }
  }
}