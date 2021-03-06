"use strict";
/*
 * This file is part of IodineGBA
 *
 * Copyright (C) 2012-2015 Grant Galitz
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 * The full license is available at http://www.gnu.org/licenses/gpl.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 */
function GameBoyAdvanceMode0Renderer(gfx) {
    this.gfx = gfx;
}
GameBoyAdvanceMode0Renderer.prototype.renderScanLine = function (line) {
    line = line | 0;
    var BG0Buffer = ((this.gfx.display & 0x1) != 0) ? this.gfx.bg0Renderer.renderScanLine(line | 0) : null;
    var BG1Buffer = ((this.gfx.display & 0x2) != 0) ? this.gfx.bg1Renderer.renderScanLine(line | 0) : null;
    var BG2Buffer = ((this.gfx.display & 0x4) != 0) ? this.gfx.bg2TextRenderer.renderScanLine(line | 0) : null;
    var BG3Buffer = ((this.gfx.display & 0x8) != 0) ? this.gfx.bg3TextRenderer.renderScanLine(line | 0) : null;
    var OBJBuffer = ((this.gfx.display & 0x10) != 0) ? this.gfx.objRenderer.renderScanLine(line | 0) : null;
    this.gfx.compositeLayers(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
    if ((this.gfx.display & 0x80) != 0) {
        this.gfx.objWindowRenderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
    }
    if ((this.gfx.display & 0x40) != 0) {
        this.gfx.window1Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
    }
    if ((this.gfx.display & 0x20) != 0) {
        this.gfx.window0Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
    }
    this.gfx.copyLineToFrameBuffer(line | 0);
}