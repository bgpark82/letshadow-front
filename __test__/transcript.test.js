import { expect, beforeEach } from "@jest/globals";
import Transcript from "../modules/transcript.js";
import YL from "../modules/youtube-loop.js";

describe("transcript test", () => {
    let transcript, captions, player;

    beforeEach(() => {
        captions = [
            {
                duration: 3.603,
                start: 6.491,
                text: "I&amp;#39;m here in the city of Shinchon today",
            },
            {
                duration: 7.559,
                start: 10.094,
                text:
                    "I remember this place being crowded↵Just completely filled with college students",
            },
            {
                duration: 4.275,
                start: 17.653,
                text: "I saw the empty streets when I passed by earlier",
            },
        ];
        player = new YL("id", {});
        transcript = new Transcript({ player, captions });
    });

    test("should initialize Transcript", () => {
        expect(transcript).not.toBeNull();
    });

    test("should throw error when initiate with wrong type", () => {
        expect(() => new Transcript({ player: null, captions })).toThrow(
            "player null is not type of YL"
        );
    });

    test("should get index 0 when timestamp is less than start time", () => {
        transcript.timestamp = 3;

        transcript.setCaptionIndex();
        expect(transcript.index).toBe(0);
    });

    test("should calculate timeout when timestamp is earlier than start", () => {
        transcript.timestamp = 3;
        transcript.index = 1;

        transcript.calculateTimeoutInit();
        expect(transcript.timeout).toBe(10.094 - 3);
    });

    test("should calculate timeout when timestamp is after start", () => {
        transcript.timestamp = 12;
        transcript.index = 1;

        transcript.calculateTimeoutInit();
        expect(transcript.timeout).toBe(7.559 + 10.094 - 12);
    });

    test("should calculate timeout when timestamp is after start", () => {
        transcript.timestamp = 12;
        transcript.index = 1;

        transcript.calculateTimeout();
        expect(transcript.timeout).toBe(7.559 + 10.094 - 12);
    });

    test("should set current timestamp", () => {
        player.getCurrentTime = jest.fn().mockReturnValue(3);
        transcript = new Transcript({ player, captions });

        transcript.setTimestamp();
        expect(transcript.timestamp).toBe(3);
    });

    test("should set current timestamp", () => {
        player.getCurrentTime = jest.fn().mockReturnValue(3);
        transcript = new Transcript({ player, captions });

        transcript.setTimestamp();
        expect(transcript.timestamp).toBe(3);
    });

    test("should get current index", () => {
        player.getCurrentTime = jest.fn().mockReturnValue(3);
        transcript = new Transcript({ player, captions });

        transcript.setTimestamp();
        expect(transcript.timestamp).toBe(3);
    });

    test("should set caption index", () => {});
});
