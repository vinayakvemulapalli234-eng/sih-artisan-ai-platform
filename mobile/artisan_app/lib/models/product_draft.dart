import 'dart:typed_data';

class ProductDraft {
  Uint8List? photoBytes;
  String? audioPath;
  String? description;
  String? priceRange;

  void reset() {
    photoBytes = null;
    audioPath = null;
    description = null;
    priceRange = null;
  }
}

final ProductDraft currentDraft = ProductDraft();