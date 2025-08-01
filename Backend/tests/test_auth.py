def test_register(client):
    response = client.post('/api/register', json={
        "username": "test",
        "email": "test@example.com",
        "phone_number": "0700000000",
        "emergency_contact_name": "John Doe",
        "emergency_contact_phone": "0700111222",
        "password": "test123"
    })
    assert response.status_code == 201
