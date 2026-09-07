import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:record/record.dart';
import '../models/product_draft.dart';

class AddProductScreen extends StatefulWidget {
  const AddProductScreen({super.key});

  @override
  State<AddProductScreen> createState() => _AddProductScreenState();
}

class _AddProductScreenState extends State<AddProductScreen> {
  final ImagePicker _picker = ImagePicker();
  final AudioRecorder _recorder = AudioRecorder();

  Uint8List? _photoBytes;
  bool _isRecording = false;
  String? _audioPath;

  Future<void> _takePhoto() async {
    final XFile? photo = await _picker.pickImage(source: ImageSource.camera);
    if (photo != null) {
      final bytes = await photo.readAsBytes();
      setState(() {
        _photoBytes = bytes;
        currentDraft.photoBytes = bytes;
      });
    }
  }

  Future<void> _toggleRecording() async {
    if (_isRecording) {
      final path = await _recorder.stop();
      setState(() {
        _isRecording = false;
        _audioPath = path;
        currentDraft.audioPath = path;
      });
    } else {
      if (await _recorder.hasPermission()) {
        await _recorder.start(const RecordConfig(), path: 'voice_note.m4a');
        setState(() {
          _isRecording = true;
        });
      }
    }
  }

  @override
  void dispose() {
    _recorder.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add Product')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            if (_photoBytes != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.memory(_photoBytes!, height: 180, fit: BoxFit.cover),
              ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              height: 80,
              child: ElevatedButton.icon(
                onPressed: _takePhoto,
                icon: const Icon(Icons.camera_alt, size: 28),
                label: Text(
                  _photoBytes == null ? 'Take Photo' : 'Retake Photo',
                  style: const TextStyle(fontSize: 18),
                ),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              height: 80,
              child: ElevatedButton.icon(
                onPressed: _toggleRecording,
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isRecording ? Colors.red : null,
                ),
                icon: Icon(_isRecording ? Icons.stop : Icons.mic, size: 28),
                label: Text(
                  _isRecording ? 'Stop Recording' : 'Record Voice Note',
                  style: const TextStyle(fontSize: 18),
                ),
              ),
            ),
            if (_audioPath != null && !_isRecording)
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Text('Voice note recorded ✓', style: TextStyle(color: Colors.green[700])),
              ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () => context.go('/pricing'),
                child: const Text('Continue', style: TextStyle(fontSize: 18)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}