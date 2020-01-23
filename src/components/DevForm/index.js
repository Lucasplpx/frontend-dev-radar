import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {

    const [github_username, setGithubusername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            }, (err) => {
                console.log(err);
            }, {
            timeout: 30000
        });

    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithubusername('');
        setTechs('');
    }
    
    return (
        <form onSubmit={handleSubmit}>

            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    value={github_username}
                    onChange={e => setGithubusername(e.target.value)}
                    name="github_username"
                    id="github_username"
                    type="text"
                    required />

            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                    name="techs"
                    id="techs"
                    type="text"
                    required />
            </div>

            <div className="input-group">

                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        name="latitude"
                        id="latitude"
                        type="number"
                        required />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        name="longitude"
                        id="longitude"
                        type="number"
                        required />
                </div>

            </div>

            <button type="submit">Salvar</button>

        </form>
    )
}