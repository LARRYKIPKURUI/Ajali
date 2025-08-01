import requests

def reverse_geocode(lat, lon):
    try:
        url = f"https://nominatim.openstreetmap.org/reverse"
        params = {
            'format': 'json',
            'lat': lat,
            'lon': lon,
            'zoom': 14,
            'addressdetails': 1
        }
        headers = {'User-Agent': 'AjaliApp/1.0'}
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            data = response.json()
            return data.get('display_name')
        return None
    except Exception as e:
        print(f"Reverse geocoding failed: {str(e)}")
        return None
