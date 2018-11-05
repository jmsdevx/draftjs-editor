import React, { Component } from "react";
import Video from "twilio-video";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Card, CardText } from "material-ui/Card";
import PageContainer from "../PageContainer1";

export default class Chat extends Component {
  constructor(props) {
    super();
    this.state = {
      identity: null,
      roomName: "",
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: null // Track the current active room
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.attachTracks = this.attachTracks.bind(this);
    this.attachParticipantTracks = this.attachParticipantTracks.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
  }

  componentDidMount() {
    axios.get("/token").then(results => {
      const { identity, token } = results.data;
      this.setState({ identity, token });
    });
  }

  handleRoomNameChange(e) {
    let roomName = e.target.value;
    this.setState({ roomName });
  }

  joinRoom() {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

    console.log("Joining room '" + this.state.roomName + "'...");
    let connectOptions = {
      name: this.state.roomName
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(
      this.state.token,
      connectOptions
    ).then(this.roomJoined, error => {
      alert("Could not connect to Twilio: " + error.message);
    });
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }

  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  detachTracks(tracks) {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    let previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector("video")) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // Participant joining room
    room.on("participantConnected", participant => {
      console.log("Joining: '" + participant.identity + "'");
    });

    // Attach participant’s tracks to DOM when they add a track
    room.on("trackAdded", (track, participant) => {
      console.log(participant.identity + " added track: " + track.kind);
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // Detach participant’s track from DOM when they remove a track.
    room.on("trackRemoved", (track, participant) => {
      console.log(participant.identity + " removed track: " + track.kind);
      this.detachTracks([track]);
    });

    // Detach all participant’s track when they leave a room.
    room.on("participantDisconnected", participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the local participant leaves the room, detach the Tracks
    // of all other participants, including that of the LocalParticipant.
    room.on("disconnected", () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach(track => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      // this.state.activeRoom = null
      this.setState({
        activeRoom: null,
        hasJoinedRoom: false,
        localMediaAvailable: false
      });
    });
  }

  render() {
    // Only show video track after user has joined a room
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        <div ref="localMedia" />
      </div>
    ) : (
      ""
    );
    // Hide 'Join Room' button if user has already joined a room.
    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <RaisedButton
        label="Leave Room"
        secondary={true}
        onClick={this.leaveRoom}
      />
    ) : (
      <RaisedButton label="Join Room" primary={true} onClick={this.joinRoom} />
    );
    return (
      <div>
        <Card>
          <CardText>
            <div className="flex-container">
              {showLocalTrack}
              <div className="flex-item">
                <TextField
                  hintText="Room Name"
                  onChange={this.handleRoomNameChange}
                  errorText={
                    this.state.roomNameErr ? "Room Name is required" : undefined
                  }
                />
                <br />
                {joinOrLeaveRoomButton}
              </div>
              {/*possible bug area*/}
              <div className="flex-item" ref="remoteMedia" id="remote-media" />
            </div>
          </CardText>
        </Card>
        <PageContainer />
      </div>
    );
  }
}
