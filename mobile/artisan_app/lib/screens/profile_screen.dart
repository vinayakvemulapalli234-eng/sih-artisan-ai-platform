import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: const [
          CircleAvatar(radius: 40, child: Icon(Icons.person, size: 40)),
          SizedBox(height: 16),
          Center(child: Text('Artisan Name', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))),
          SizedBox(height: 24),
          ListTile(leading: Icon(Icons.brush), title: Text('Craft'), subtitle: Text('Not set')),
          ListTile(leading: Icon(Icons.location_on), title: Text('Region'), subtitle: Text('Not set')),
          ListTile(leading: Icon(Icons.phone), title: Text('Phone'), subtitle: Text('Not set')),
        ],
      ),
    );
  }
}