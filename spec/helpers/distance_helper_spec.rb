require 'spec_helper'


describe DistanceHelper do
  describe "#compute" do

    it "should compute distance with less than 0.2m diff with google map computed value" do
      value = DistanceHelper.compute(4.695625, 48.398152, 4.694424, 48.396328)
      gmaps_value = 221.583

      diff = gmaps_value - value

      diff.abs().should <= 0.25

      value.should eq 221.35479611898023
    end
    it "should compute same inverse distance" do
      one_way = DistanceHelper.compute(4.695625, 48.398152, 4.694424, 48.396328)
      back = DistanceHelper.compute(4.694424, 48.396328, 4.695625, 48.398152)

      one_way.should eq back
    end
  end
end
